import React from 'react';
import {CustomError} from 'components';
export default function NotFound() {
  return (
    <div className="container">
      <CustomError title="Doh! 404!"
                   description="Don’t worry, we have lots of other interesting Stuff!"/>
    </div>
  );
}
