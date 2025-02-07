import React, { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import LoginPopup from "./header/loginPopup";

function LoginPopupComponent() {
  const active = useSelector((state) => state.auth.status);
  const activeRef = useRef(active);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeRef.current) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth="sm"
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>
        <DialogContentText>
          <div className="min-h-60">
            <LoginPopup onClose={() => setOpen(false)} />
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default LoginPopupComponent;
