import { IsAlphanumeric } from "class-validator";

export class CreateUserDto{
    @IsAlphanumeric()
    name: string;
}