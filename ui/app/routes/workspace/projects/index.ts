import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApiService from 'waypoint/services/api';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import PollModelService from 'waypoint/services/poll-model';

export default class Index extends Route {
  @service api!: ApiService;
  @service pollModel!: PollModelService;

  async model() {
    let resp = await this.api.client.listProjects(new Empty(), this.api.WithMeta());
    let projects = resp.getProjectsList().map((p) => p.toObject());

    return projects;
  }

  afterModel() {
    this.pollModel.setup(this);
  }
}
