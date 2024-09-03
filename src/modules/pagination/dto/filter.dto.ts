import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export const DEFAULT_PAGE_SIZE = 10;

export class FilterDto {
    @Transform(({ value }) => parseInt(value))
    @IsNumber({}, { message: ' "page" atrribute should be a number' })
    public page: number = 1;

    @Transform(({ value }) => parseInt(value))
    @IsNumber({}, { message: ' "pageSize" attribute should be a number ' })
    public pageSize: number = DEFAULT_PAGE_SIZE;
}