import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

function ButtonLogin() {
  return (
    <Stack spacing={2} direction="row">
      <Link href={`/login`} variant="body2">
        <Button variant="outlined" sx={{ color: "white" }}>
          Login
        </Button>
      </Link>
    </Stack>
  );
}

export default ButtonLogin;
