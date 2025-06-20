import { UserComment } from "@/app/lib/definitions";
import { placeholders } from "@/app/lib/placeholder-data";
import { formatDateToLocal, sliceText } from "@/app/lib/utils";
import Image from "next/image";

export function DisplayComments({ comments }: { comments: UserComment[] }) {
    if (comments.length === 0) {
        return (
            <span>
                No comment on this product yet. Be the first to drop a comment!
            </span>
        )
    }

    // parse comments
    const cleanComments = comments.map((comment) => {
        if (typeof comment.comments == "string") {
            comment['comments'] = JSON.parse(comment.comments);
        }
        return comment;
    });

    console.log("CLEAN COMMENT: ", cleanComments);
    return (
        cleanComments.map((comment) => (
            <div className="comment-holder" key={comment.id}>
                <div className="comment-image-holder">
                    <Image src={comment?.photo?.source || placeholders.unisex_profile_picture} alt={`Photo of ${comment.name}`} width={100} height={100} />
                </div>
                <div className="comment-detail-holder">
                    <h4 className="commenter-name">{sliceText(comment.name, 20, false, true)}</h4>
                    <div className="comment-box">
                        {/* display the last comment edit made */}
                        {comment.comments[comment.comments.length - 1].comment}
                        <div className="comment-date">
                            {formatDateToLocal(comment.comments[comment.comments.length - 1].timestamp)}
                        </div>
                    </div>
                </div>
            </div>
        ))
    )
}