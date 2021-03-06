import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function HalfRating(props) {
  return (
    <Stack spacing={1}>
      <Rating
        name='half-rating-read'
        value={props.num}
        precision={0.25}
        readOnly
      />
    </Stack>
  );
}
