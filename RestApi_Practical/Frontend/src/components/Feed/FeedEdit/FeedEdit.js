import React, { useState, useEffect, Fragment } from "react";
import Backdrop from "../../Backdrop/Backdrop";
import Modal from "../../Modal/Modal";
import Input from "../../Form/Input/Input";
import FilePicker from "../../Form/Input/FilePicker";
import Image from "../../Image/Image";
import { required, length } from "../../../util/validators";
import { generateBase64FromImage } from "../../../util/image";

const POST_FORM = {
  title: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
  image: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
  content: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
};

const FeedEdit = () => {
  const [editing, setEditing] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postForm, setPostForm] = useState(POST_FORM);
  const [formIsValid, setFormIsValid] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Example: Fetch initial post data if editing mode
    // Replace this with your actual logic to fetch post data
    if (editing && selectedPost) {
      // Simulated data update for editing
      const updatedForm = {
        title: {
          ...POST_FORM.title,
          value: selectedPost.title,
          valid: true,
        },
        image: {
          ...POST_FORM.image,
          value: selectedPost.imagePath,
          valid: true,
        },
        content: {
          ...POST_FORM.content,
          value: selectedPost.content,
          valid: true,
        },
      };
      setPostForm(updatedForm);
      setFormIsValid(true);
    } else {
      // Reset form state if not editing
      setPostForm(POST_FORM);
      setFormIsValid(false);
      setImagePreview(null);
    }
  }, [editing, selectedPost]);

  const postInputChangeHandler = (input, value, files) => {
    if (files) {
      generateBase64FromImage(files[0])
        .then((b64) => {
          setImagePreview(b64);
        })
        .catch((e) => {
          setImagePreview(null);
        });
    }
    setPostForm((prevState) => {
      let isValid = true;
      for (const validator of prevState[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState,
        [input]: {
          ...prevState[input],
          valid: isValid,
          value: files ? files[0] : value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      setFormIsValid(formIsValid);
      return updatedForm;
    });
  };

  const inputBlurHandler = (input) => {
    setPostForm((prevState) => ({
      ...prevState,
      [input]: {
        ...prevState[input],
        touched: true,
      },
    }));
  };

  const cancelPostChangeHandler = () => {
    setEditing(false);
    setSelectedPost(null);
  };

  const acceptPostChangeHandler = () => {
    const post = {
      title: postForm.title.value,
      image: postForm.image.value,
      content: postForm.content.value,
    };
    // Example: Call a function to handle post submission
    // Replace this with your actual function to handle post submission
    console.log("Submitting post:", post);
    setEditing(false);
    setSelectedPost(null);
  };

  return editing ? (
    <Fragment>
      <Backdrop onClick={cancelPostChangeHandler} />
      <Modal
        title="New Post"
        acceptEnabled={formIsValid}
        onCancelModal={cancelPostChangeHandler}
        onAcceptModal={acceptPostChangeHandler}
        isLoading={false} // Replace with actual loading state if needed
      >
        <form>
          <Input
            id="title"
            label="Title"
            control="input"
            onChange={(e) => postInputChangeHandler("title", e.target.value)}
            onBlur={() => inputBlurHandler("title")}
            valid={postForm.title.valid}
            touched={postForm.title.touched}
            value={postForm.title.value}
          />
          <FilePicker
            id="image"
            label="Image"
            control="input"
            onChange={(e) =>
              postInputChangeHandler("image", e.target.value, e.target.files)
            }
            onBlur={() => inputBlurHandler("image")}
            valid={postForm.image.valid}
            touched={postForm.image.touched}
          />
          <div className="new-post__preview-image">
            {!imagePreview && <p>Please choose an image.</p>}
            {imagePreview && <Image imageUrl={imagePreview} contain left />}
          </div>
          <Input
            id="content"
            label="Content"
            control="textarea"
            rows="5"
            onChange={(e) => postInputChangeHandler("content", e.target.value)}
            onBlur={() => inputBlurHandler("content")}
            valid={postForm.content.valid}
            touched={postForm.content.touched}
            value={postForm.content.value}
          />
        </form>
      </Modal>
    </Fragment>
  ) : null;
};

export default FeedEdit;
