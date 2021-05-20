import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';

class User {
    id: bigint
    name: string
    age: number
}

// 
@JsonController()
export class UserJsonController {

    @Get('/users-json')
    getAll() {
        let user = new User()
        user.name = 'tom'
        user.age = 10

        return [user];
    }

    @Get('/users-json/:id')
    getOne(@Param('id') id: number) {
        let user = new User()
        user.name = 'tom'
        user.age = 10
        if (id === 1) {
            user.age = 18
        }
        return user;
    }

    @Post('/users-json')
    post(@Body() user: any) {
        return 'Saving user...';
    }

    @Put('/users-json/:id')
    put(@Param('id') id: number, @Body() user: any) {
        return 'Updating a user...';
    }

    @Delete('/users-json/:id')
    remove(@Param('id') id: number) {
        return 'Removing user...';
    }
}