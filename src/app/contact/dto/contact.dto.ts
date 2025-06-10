import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateIf,
} from 'class-validator';

export class ContactDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    mobile: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @ValidateIf(o => o.type === 'academic')
    @IsNotEmpty({ message: 'ID Proof is required for academic type' })
    id_proof?: string;

    @IsOptional()
    @IsString()
    about?: string;
}