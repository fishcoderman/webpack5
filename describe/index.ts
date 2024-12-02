function StartTime(target: Function): void {
  target.prototype.start = function (): void {
    // 通用功能
    console.log('start')
  }
}
function EndTime(target: Function): void {
  target.prototype.end = function (): void {
    // 通用功能
    console.log('end')
  }
}
@StartTime
@EndTime
class Course {
  constructor() {
    // 业务逻辑
  }
}
let course = new Course();
console.log('course', course.start())
console.log('course', course.end())
