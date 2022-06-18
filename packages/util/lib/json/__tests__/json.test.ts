import { MergeObject, ReadPropertyPath, WriteToPropertyPath } from '..';

describe('json', () => {
  test('must merge objects correctly when the keys are array', () => {
    const obj1: any = {
      foo: ['1', '2'],
      bar: ['3', '4']
    };
    const obj2: any = {
      foo: ['5', '6'],
      bar: ['7', '8']
    };
    expect(MergeObject(obj1, obj2)).toEqual(
      JSON.parse('{"bar": ["3", "4", "7", "8"], "foo": ["1", "2", "5", "6"]}')
    );
  });

  test('must merge objects correctly when they are array object', () => {
    const obj1: any = [{ foo: 'bar' }, { bas: 'baz' }];
    const obj2: any = [{ lorem: 'ipsum' }, { dolor: 'sit' }];
    expect(MergeObject(obj1, obj2)).toEqual(
      JSON.parse(
        '[{"foo": "bar", "lorem": "ipsum"}, {"bas": "baz", "dolor": "sit"}]'
      )
    );
  });

  test('must merge objects correctly when they are pure object', () => {
    const obj1 = { foo: 'bar' };
    const obj2 = { lorem: 'ipsum' };
    expect(MergeObject(obj1, obj2)).toEqual(
      JSON.parse('{"foo": "bar", "lorem": "ipsum"}')
    );
  });

  test('must read property path correctly', () => {
    const testObj: any = {
      userInfo: {
        address: {
          city: 'Istanbul',
          district: 'Uskudar',
          street: 'Selimiye'
        }
      }
    };
    expect(
      ReadPropertyPath({ testObj }, 'testObj/userInfo/address/city')
    ).toEqual('Istanbul');
    expect(
      ReadPropertyPath({ testObj }, 'testObj/userInfo/address/district')
    ).toEqual('Uskudar');
    expect(
      ReadPropertyPath({ testObj }, 'testObj/userInfo/address/street')
    ).toEqual('Selimiye');
  });

  test('must write value to the property correctly', () => {
    const testObj: any = {
      userInfo: {
        address: {
          city: 'Istanbul',
          district: 'Uskudar',
          street: 'Selimiye'
        }
      }
    };

    WriteToPropertyPath({ testObj }, 'testObj/userInfo/address/city', 'Ankara');
    WriteToPropertyPath(
      { testObj },
      'testObj/userInfo/address/district',
      'Kızılay'
    );
    WriteToPropertyPath(
      { testObj },
      'testObj/userInfo/address/street',
      'Sakarya'
    );

    expect(
      ReadPropertyPath({ testObj }, 'testObj/userInfo/address/city')
    ).toEqual('Ankara');
    expect(
      ReadPropertyPath({ testObj }, 'testObj/userInfo/address/district')
    ).toEqual('Kızılay');
    expect(
      ReadPropertyPath({ testObj }, 'testObj/userInfo/address/street')
    ).toEqual('Sakarya');
  });
});
