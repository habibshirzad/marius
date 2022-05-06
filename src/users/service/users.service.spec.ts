import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation( user => Promise.resolve({id: Date.now(), ...user})),
    update: jest.fn((id,dto) => ({
      id,
      ...dto
    })),
    findOne: jest.fn()
    

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, 
      {
        provide: getRepositoryToken(User),
        useValue:mockUserRepository
      },
    ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

// create - userservice test
  it('shd create a new user and return that', async () => {
    expect(await service.create({name: 'habib'})).toEqual({
      id: expect.any(Number),
      name: 'habib',
    });
  });


  // update test - 
  it('should update a user', async  () => {
    const dto = { id: '1',name: 'habib' };
    expect( await service.update(1, dto)).toEqual({
      id: 1,
      ...dto,
    })

  });

  it('should find a user by id',  async () => {
    const dto = {id:1,name:'k'}
    expect( await service.findOne(1)).not.toEqual(null)
      
    })
  
   
  })

