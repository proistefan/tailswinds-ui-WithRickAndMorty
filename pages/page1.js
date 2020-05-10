import React from 'react';
import Link from 'next/link';

const Page1 = () => {
  return (
    <div>
      <Link href={'/'}>
        <a>
          Click to go back home
        </a>
      </Link>

    </div>
  );
};

export default Page1;