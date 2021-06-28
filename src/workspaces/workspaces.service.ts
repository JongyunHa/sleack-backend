import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { Workspaces } from 'src/entities/Workspaces';
import { Repository, Transaction, TransactionRepository } from 'typeorm';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findById(id: number): Promise<Workspaces[]> {
    return this.workspacesRepository.findByIds([id]);
  }

  async findMyWorkspaces(myId: number) {
    return this.workspacesRepository.find({
      where: {
        WorkspaceMembers: [{ UserId: myId }],
      },
    });
  }

  @Transaction()
  async createWorkspace(
    @TransactionRepository(Workspaces)
    workspacesRepository: Repository<Workspaces>,
    @TransactionRepository(WorkspaceMembers)
    workspaceMembersRepository: Repository<WorkspaceMembers>,
    @TransactionRepository(Channels)
    channelsRepository: Repository<Channels>,
    @TransactionRepository(ChannelMembers)
    channelMembersRepository: Repository<ChannelMembers>,
    name: string,
    url: string,
    myId: number,
  ) {
    const workspace = workspacesRepository.create({
      name,
      url,
      OwnerId: myId,
    });

    const returned = await workspacesRepository.save(workspace);

    const workspaceMember = workspaceMembersRepository.create({
      UserId: myId,
      WorkspaceId: returned.id,
    });

    const channel = channelsRepository.create({
      name: '일반',
      WorkspaceId: returned.id,
    });
    const [, channelReturned] = await Promise.all([
      workspaceMembersRepository.save(workspaceMember),
      channelsRepository.save(channel),
    ]);
    const channelMember = channelMembersRepository.create({
      UserId: myId,
      ChannelId: channelReturned.id,
    });
    await this.channelMembersRepository.save(channelMember);
  }

  async getWorkspaceMembers(url: string) {
    return await this.usersRepository
      .createQueryBuilder('user')
      .innerJoin('user.WorkspaceMembers', 'm')
      .innerJoin('m.Workspace', 'w', 'w.url = :url', { url })
      .getMany();
  }

  async createWorkspaceMembers(url, email) {
    const workspace = await this.workspacesRepository.findOne({
      where: { url },
      // relation: ['Channels'],
      join: {
        alias: 'workspace',
        // innerJoin 는 보통  join 한 테이블의 정보를 가져오지 않는다.
        // 그래서 정보를 모두 가져오기위해서 innerJoinAndSelect 를 사용함.
        innerJoinAndSelect: {
          channels: 'workspace.Channels',
        },
      },
    });
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const workspaceMember = new WorkspaceMembers();
    workspaceMember.WorkspaceId = workspace.id;
    workspaceMember.UserId = user.id;
    await this.workspaceMembersRepository.save(workspaceMember);
    const channelMember = new ChannelMembers();
    channelMember.ChannelId = workspace.Channels.find(
      (v) => v.name === '일반',
    ).id;
    channelMember.UserId = user.id;
    await this.channelMembersRepository.save(channelMember);
  }

  async getWorkspaceMember(url: string, id: number) {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .innerJoin('user.Workspaces', 'workspaces', 'workspaces.url = :url', {
        url,
      })
      .getOne();
  }
}
