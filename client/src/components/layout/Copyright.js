import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export default function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://pactlegacy.com/' target='_blank'>
        Pact Legacy
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}
