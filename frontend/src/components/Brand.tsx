import React from 'react';

export const Brand: React.FC<{ photo: string }> = ({ photo }) => (
    <div className="brand">
        <img src={photo} />
    </div>
)