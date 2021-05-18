package adList;

import com.google.gson.Gson;
import java.util.*;

public class Ad {
    private final String id;
    private String description;
    private final Date createdAt;
    private String link;
    private String vendor;
    private String photoLink;
    private List<String> hashTags;
    private String discount;
    private Date validUntil;
    private Double rating;
    private List<String> reviews;

    public Ad(String id, String description, Date createdAt, String link, String vendor, List<String> hashTags, String discount, Date validUntil) {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt != null ? (Date) createdAt.clone() : null;
        this.link = link;
        this.vendor = vendor;
        this.hashTags = hashTags != null ? new ArrayList<>(hashTags) : null;
        this.discount = discount;
        this.setValidUntil(validUntil);
    }
    public Ad(Ad ad){
        if(ad != null) {
            this.setHashTags(ad.getHashTags());
            this.id = ad.getId();
            this.setDescription(ad.getDescription());
            this.createdAt = ad.getCreatedAt();
            this.setLink(ad.getLink());
            this.setVendor(ad.getVendor());
            this.setPhotoLink(ad.getPhotoLink());
            this.setHashTags(ad.getHashTags());
            this.setDiscount(ad.getDiscount());
            this.setValidUntil(ad.getValidUntil());
            this.setRating(ad.getRating());
            this.setRating(ad.getRating());
        }
        else {
            id = null;
            createdAt = null;
        }
    }
    public Ad(String json){
        this(new Gson().fromJson(json, Ad.class));
    }
    public String getDescription() {
        return description;
    }

    public boolean setDescription(String description) {
        if(description !=null && description.length() < 200) {
            this.description = description;
            return true;
        }
        else {
            return false;
        }
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getVendor() {
        return vendor;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor.trim().equals("")? "vendor" + id : vendor;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public List<String> getHashTags() {
        return hashTags != null ? new ArrayList<>(hashTags) : null;
    }

    public void setHashTags(List<String> hashTags) {
        this.hashTags = hashTags != null ? new ArrayList<>(hashTags) : null;
    }

    public String getDiscount() {
        return discount;
    }

    public void setDiscount(String discount) {
        this.discount = discount;
    }

    public Date getValidUntil() {
        return validUntil != null ? (Date) validUntil.clone() : null;
    }

    public void setValidUntil(Date validUntil) {
        this.validUntil = validUntil != null ? (Date) validUntil.clone() : null;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public List<String> getReviews() {
        return reviews != null ? new ArrayList<>(reviews) : null;
    }

    public void setReviews(List<String> reviews) {
        this.reviews = reviews != null ? new ArrayList<>(reviews) : null;
    }

    public String getId() {
        return id;
    }

    public Date getCreatedAt() {
        return createdAt != null ? (Date) createdAt.clone() : null;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("id = " + id + "<br>");
        sb.append("description = " + description + "<br>");
        sb.append("createdAt = " + createdAt+"<br>");
        sb.append("link = " + link+"<br>");
        sb.append("vendor = " + vendor+"<br>");
        sb.append("hashTags = " + hashTags+"<br>");
        sb.append("discount = " + discount+"<br>");
        sb.append("validUntil = " + validUntil+"<br>");
        return String.valueOf(sb);
    }

    @Override
    protected Ad clone() {
        return new Ad(this);
    }
}