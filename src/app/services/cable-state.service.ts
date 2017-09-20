import { Observable } from 'rxjs/Observable';

import { v4 as uuid } from 'uuid';

import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import {
  Cable,
  Connection,
  ConnectionPair,
  InputConnection,
  OutputConnection,
  Input,
  Output,
} from '../models/cable';

import * as fromRoot from '../reducers';

import * as fromCable from '../actions/cable';

import { getValue } from '../util/observable';

@Injectable()
export class CableStateService {

  cables$: Observable<Cable[]>;
  connections$: Observable<Connection[]>;
  connectionPairs$: Observable<ConnectionPair[]>;
  unpairedConnection$: Observable<Connection | null>;

  constructor(private store: Store<fromRoot.State>) {
    this.cables$ = this.store.select(fromRoot.getAllCables);
    this.connections$ = store.select(fromRoot.getAllConnections);
    this.connectionPairs$ = store.select(fromRoot.getConnectionPairs);
    this.unpairedConnection$ = store.select(fromRoot.getUnpairedConnection);
  }

  addCable(connection1Id: string, connection2Id: string) {
    const cable: Cable = {
      id: uuid(),
      connectionIds: [connection1Id, connection2Id],
    };
    const action = new fromCable.AddCableAction(cable);
    this.store.dispatch(action);
  }

  removeCable(id: string) {
    const action = new fromCable.RemoveCableAction(id);
    this.store.dispatch(action);
  }

  connectInput(mother32Id: string, patchPoint: Input, x: number, y: number) {
    const connection: InputConnection  = {
      type: 'input',
      id: uuid(),
      mother32Id,
      patchPoint,
      x,
      y,
    };
    this.addConnection(connection);
  }

  connectOutput(mother32Id: string, patchPoint: Output, x: number, y: number) {
    const connection: OutputConnection = {
      type: 'output',
      id: uuid(),
      mother32Id,
      patchPoint,
      x,
      y,
    };
    this.addConnection(connection);
  }

  addConnection(connection: Connection) {
    this.removeOverlappingConnection(connection);

    const unpaired = getValue(this.unpairedConnection$);
    if (unpaired === null) {
      const action = new fromCable.AddUnpairedConnectionAction(connection);
      this.store.dispatch(action);
    }
    else {
      const action = new fromCable.AddPairedConnectionAction(connection);
      this.store.dispatch(action);
      this.addCable(unpaired.id, connection.id);
    }
  }

  cancelConnection() {
    const unpaired = getValue(this.unpairedConnection$);
    if (unpaired !== null) {
      const action = new fromCable.RemoveConnectionAction(unpaired.id);
      this.store.dispatch(action);
    }
  }

  removeConnection(id: string) {
    const action = new fromCable.RemoveConnectionAction(id);
    this.store.dispatch(action);
  }

  removeOverlappingConnection(connection: Connection) {
    const existing = getValue(this.selectMother32Connections$(connection.mother32Id));
    const overlapping = existing.find((other) => {
      return other.type === connection.type && other.patchPoint === connection.patchPoint;
    });
    if (!overlapping) {
      return;
    }

    const cables = getValue(this.cables$);
    const cable = cables.find((cable) => cable.connectionIds.includes(overlapping.id));

    this.removeCable(cable.id);
    for (let connectionId of cable.connectionIds) {
      this.removeConnection(connectionId);
    }
  }

  selectMother32Connections$(mother32Id: string): Observable<Connection[]> {
    return this.store.select(fromRoot.getMother32Connections(mother32Id));
  }

  removeConnectedCables(mother32Id: string) {
    const directConnections = getValue(this.selectMother32Connections$(mother32Id));
    let directConnectionIds = new Set(directConnections.map((connection) => connection.id));

    const cables = getValue(this.cables$);
    const { cableIds, connectionIds } = cables.reduce((acc, cable) => {
      const connectionIds = new Set(cable.connectionIds);
      const pairIds = connectionIds.intersection(directConnectionIds);

      if (pairIds.size > 0) {
        acc.cableIds.push(cable.id);
        acc.connectionIds = acc.connectionIds.concat(cable.connectionIds);
      }

      return acc;
    }, {
      cableIds: [],
      connectionIds: [],
    });

    for (let cableId of cableIds) {
      this.removeCable(cableId);
    }

    for (let connectionId of connectionIds) {
      this.removeConnection(connectionId);
    }
  }

}
