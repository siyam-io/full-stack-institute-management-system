import React from 'react';

interface SchemaInjectorProps {
  schemas: object[];
}

const SchemaInjector = ({ schemas }: SchemaInjectorProps) => {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};

export default SchemaInjector;
