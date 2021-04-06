import {Inject, InjectionToken} from '@angular/core';
import {createTokenForReference} from '@angular/compiler/src/identifiers';

const Storage = new InjectionToken(
    'key for local storage',
    {providedIn: 'root', factory: () => localStorage}
);

//
class StorageService {


}
