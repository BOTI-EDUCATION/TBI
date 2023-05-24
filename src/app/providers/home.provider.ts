import { Injectable } from '@angular/core';

import { HomeType, HomeData } from '@models/business';

import { AppUserService } from '../services/api/app-user.service';
import { BaseProvider } from './base.provider';

@Injectable({
  providedIn: 'root',
})
export class HomeProvider {
  private endpoints = {
    home: 'tbi_home',
    eleves_presence: 'tbi_presence',
    eleves_discipline: 'tbi_discipline',
    get_actions: 'tbi_home',
    ressources: 'tbi_ressources',
  };

  constructor(private base: BaseProvider, private userPrv: AppUserService) {}

  data(seance_id) {
    return this.base.get<any>(this.endpoints.home, { cours_id : seance_id,  enseignant_id : 18 }, this.userPrv.getToken());
  }
  get_actions(type) {
    return this.base.get<any>(this.endpoints.get_actions, { get_actions : type }, this.userPrv.getToken());
  }

  ressources_collapses() {
    return this.base.get<any>(this.endpoints.ressources, { enseignant_id : 18 }, this.userPrv.getToken());
  }

  ressources(niveau, matiere) {
    return this.base.get<any>(this.endpoints.ressources, { niveau: niveau, matiere: matiere, enseignant_id : 18 }, this.userPrv.getToken());
  }

  ressource(id) {
    return this.base.get<any>(this.endpoints.ressources, { id: id, enseignant_id : 18 }, this.userPrv.getToken());
  }

  eleves(seance: any) {
    // seance
    return this.base.get<any>(this.endpoints.eleves_presence, { enseignant_id : 18, cours_id: seance }, this.userPrv.getToken());
  }

  save_presence(data, typePage) {
    data += '&enseignant_id='+18;
    return this.base.post<any>(typePage == 'presence' ? this.endpoints.eleves_presence : this.endpoints.eleves_discipline, data, this.userPrv.getToken());
  }

  
}
