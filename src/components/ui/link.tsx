"use client";

import React from 'react';

const Link = ({ href, children }) => {
  return (
    <a href={href} className="text-blue-600 hover:text-blue-700 underline">
      {children}
    </a>
  );
};

export default Link;