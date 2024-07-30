import Comment from "./Comment";
import Avatar from "./Avatar";

function PostOpen({
  dialogRef,
  imageUrl,
  authorUser,
  getTranslatedCategory,
  category,
  description,
  comments,
  getPublicationDate,
  formRef,
  postComment,
}) {
  const commentsStyle = "flex items-center gap-4 p-6";

  return (
    <dialog ref={dialogRef}>
      <div className="flex">
        <img
          src={imageUrl}
          alt=""
          className="  h-[90vh] border-2 border-solid border-black "
        />
        <ul className="flex flex-col justify-between w-[500px]">
          <div>
            <div className="border-b-2">
              <div className={`${commentsStyle}  `}>
                <Avatar imageUrl={authorUser?.avatar} />{" "}
                <p>
                  {authorUser?.username}{" "}
                  <b>#{getTranslatedCategory(category)}</b>
                </p>
              </div>
              <p className={`${commentsStyle} pt-0`}>{description}</p>
            </div>
            {comments?.map((comment) => (
              <Comment
                className={commentsStyle}
                key={comment._id}
                date={comment.createdAt}
                getPublicationDate={getPublicationDate}
                message={comment.comment}
                authorId={comment.userId}
              />
            ))}
          </div>
          <form
            ref={formRef}
            onSubmit={postComment}
            className="flex px-3 gap-5"
          >
            <input
              type="text"
              name="comment"
              autoComplete="off"
              placeholder="Agrega un comentario"
            />
            <button type="submit">Publicar</button>
          </form>
        </ul>
      </div>
    </dialog>
  );
}
