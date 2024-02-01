import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class NullValidationPipe implements PipeTransform {
    private static isObj;
    private dropNull;
    transform(values: any, metadata: ArgumentMetadata): any;
}
