package adList;

public class AdIncomplete extends Ad {
    public AdIncomplete(){
        super(null, null, null, null,null,null,null,null);
    }

    public static void merge(Ad ad1, Ad ad2){
        if(ad2.getDescription() != null){
            ad1.setDescription(ad2.getDescription());
        }
        if(ad2.getLink() != null){
            ad1.setLink(ad2.getLink());
        }
        if(ad2.getPhotoLink() != null){
            ad1.setPhotoLink(ad2.getPhotoLink());
        }
        if(ad2.getHashTags() != null){
            ad1.setHashTags(ad2.getHashTags());
        }
        if(ad2.getDiscount() != null){
            ad1.setDiscount(ad2.getDiscount());
        }
        if(ad2.getValidUntil() != null){
            ad1.setValidUntil(ad2.getValidUntil());
        }
        if(ad2.getRating() != null){
            ad1.setRating(ad2.getRating());
        }
        if(ad2.getReviews() != null){
            ad1.setReviews(ad2.getReviews());
        }
    }

}