import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('api/workspaces/:url')
export class WorkspacesController {
  @Get()
  getmyWorkspaces() {}

  @Post()
  createWorkspace() {}

  @Get(':url/members')
  getAllMembersFromWorkspace() {}

  @Post(':url/members')
  inviteMembersToWorkspace() {}

  @Delete(':url/members')
  kickMemberFromWorkspace() {}

  @Get(':url/members/:id')
  getMemberInfoInWorkspace() {}
}
