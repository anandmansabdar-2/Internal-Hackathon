import React from 'react';
import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ mt: 5, py: 2, bgcolor: '#0D47A1', color: 'white', textAlign: 'center' }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} Government of India. All rights reserved.
      </Typography>
      <Typography variant="body2">
        <Link href="#" sx={{ color: 'white', mx: 1 }}>Privacy Policy</Link> |
        <Link href="#" sx={{ color: 'white', mx: 1 }}>Terms of Use</Link> |
        <Link href="#" sx={{ color: 'white', mx: 1 }}>Contact Us</Link>
      </Typography>
    </Box>
  );
}
