import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type WriteReviewProps = {
  open: boolean;
  handleClose: any;
};
const WriteReview = ({ open, handleClose }: WriteReviewProps) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const handleRatingChange = (newRating: any) => {
    setRating(newRating);
  };

  const handleReviewChange = (event: any) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    // Handle the submission of the review
    console.log(`Rating: ${rating}, Review: ${review}`);
    // You might want to send this data to a backend server
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          pr: 2,
        }}
      >
        <DialogTitle component={'h3'} sx={{ m: 0, p: 2, fontWeight: '500' }} id="customized-dialog-title">
          Write a Review
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers className={"mx-2"}>
          <Typography
            gutterBottom
            sx={{ flex: 1 }}
            variant="h6"
            component="div"
          >
            Share your experience
          </Typography>
          <Typography
            gutterBottom
            sx={{ flex: 1 }}
            variant="subtitle2"
            component="div"
          >
            Your overall rating *
          </Typography>
          <div className="mb-2">
            {[1, 2, 3, 4, 5].map((star, index) => (
              <span
                key={index}
                onClick={() => handleRatingChange(star)}
                style={{
                  cursor: "pointer",
                  color: rating >= star ? "black" : "lightgrey",
                }}
              >
                ★
              </span>
            ))}
          </div>
          <Typography
            gutterBottom
            sx={{ flex: 1 }}
            variant="subtitle2"
            component="div"
          >
            Tell other people more about the product. What about the quality? Or
            the comfort?
          </Typography>
          <TextareaAutosize
            className="mx-3 w-100"
            minRows={4}
            onChange={handleReviewChange}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default WriteReview;
