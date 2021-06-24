import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// AOP programming

// 미들웨어가 장착되고 실행되는 순서
// 세로로 공통되는 부분들을 어떻게 중복을 없앨 수는 없을까?
// interceptor 의 역활
// A -> B -> C -> D
// A -> C -> D
// A -> E -> F -> D -> G
// Z -> A -> X -> D

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // controller 가기 전 부분
    // 데이터를 마지막으로 한번더 가공하기 위해서 지금은 사용함
    // 예를 들어 컨트롤러가 들어와서 나갈때 까지 시간이 얼마나걸리는 지도 확인 할 수 있음
    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data)));
  }
}
