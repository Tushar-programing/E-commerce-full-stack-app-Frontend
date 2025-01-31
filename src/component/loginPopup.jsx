import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { RxCross1 } from "react-icons/rx";
import LoginPopup from "./header/loginPopup";

function LoginPopupComponent() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Login</h2>
              <button onClick={() => setOpen(false)}>
                <RxCross1 className="text-2xl" />
              </button>
            </div>
            <div className="min-h-60">
              <LoginPopup onClose={() => setOpen(false)} />
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LoginPopupComponent;
