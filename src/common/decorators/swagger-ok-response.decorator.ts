// api-success-response.decorator.ts
import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { SuccessResponseDto } from '../dto/success-response.dto';

export const ApiSuccessResponse = <TModel extends Type<any>>(
  model: TModel,
  option?: { isArray?: boolean },
) => {
  return applyDecorators(
    ApiExtraModels(SuccessResponseDto, model),
    ApiOkResponse({
      schema: option?.isArray
        ? {
            allOf: [
              // Base wrapper fields
              { $ref: getSchemaPath(SuccessResponseDto) },
              // Override `data` with your specific model
              {
                properties: {
                  data: {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  },
                },
              },
            ],
          }
        : {
            allOf: [
              // Base wrapper fields
              { $ref: getSchemaPath(SuccessResponseDto) },
              // Override `data` with your specific model
              {
                properties: {
                  data: { $ref: getSchemaPath(model) },
                },
              },
            ],
          },
    }),
  );
};
