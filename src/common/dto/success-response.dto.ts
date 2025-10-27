import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto<T = any> {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'SUCCESS' })
  code: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({ example: '2025-09-01T10:00:00.000Z' })
  timestamp: string;

  // keep T flexible; schema will override this per-endpoint
  @ApiProperty()
  data: T;
}
