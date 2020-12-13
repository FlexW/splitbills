export function spyPropertyGetter(
  spyObj: jasmine.SpyObj<unknown>,
  propName: string
) {
  return Object.getOwnPropertyDescriptor(spyObj, propName)
    ?.get as jasmine.Spy<any>;
}
