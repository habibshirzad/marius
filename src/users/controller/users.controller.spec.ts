import { optional } from '@hapi/joi';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { UsersService } from '../service/users.service';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  // mocking the userservice
  const mockUsersSerivce = {
    create: jest.fn(dto => {
      return{
        // id: Date.now(),
        ...dto
      }
    }),
    update: jest.fn((id,dto) => ({
      id,
      ...dto
    })),

    findAll: jest.fn()
  }

// dependencies
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    })
    .overrideProvider(UsersService)
    .useValue(mockUsersSerivce)
    .compile();

    controller = module.get<UsersController>(UsersController);
  });

  // first test - define controller.
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // second test - testing create method
  it('should create a user',() => {
    
    // const dto = {name:'habibshirzad'}
    // expect(controller.create(dto)).toEqual({
    //   name: dto.name 
    //   });

    expect(controller.create({name:'habibshirzad'})).toEqual({
        // id: expect.any(Number),
        name: 'habibshirzad'
      });

      // its optional jsut to make sure it called create method
      expect(mockUsersSerivce.create).toHaveBeenCalledWith({name:'habibshirzad'});
      // expect(mockUsersSerivce.create).toHaveBeenCalledWith(dto);

  })

  // findall users test
  it('it shd return all users', () => {
    expect(controller.findAll())
  })

  // update testing
  it('should update a user',() => {
    const dto = { name: 'habib' };
    expect(controller.update(1, dto)).toEqual({
      id: 1,
      ...dto,
    })

    expect(mockUsersSerivce.update).toHaveBeenCalled();
  });

  


});
