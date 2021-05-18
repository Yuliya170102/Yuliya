package adList;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class FilterConfig {
    private Date fromDate;
    private Date toDate;
    private String vendor;
    private List<String> hashTags;
    public FilterConfig(){

    }
    public FilterConfig(String json){
        this(json!=null? new Gson().fromJson(json,FilterConfig.class) : null);
    }
    public FilterConfig(FilterConfig filterConfig){
        if(filterConfig != null) {
            setFromDate(filterConfig.fromDate);
            setToDate(filterConfig.toDate);
            setVendor(filterConfig.vendor);
            setHashTags(filterConfig.hashTags);
        }
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = (Date) fromDate.clone();
    }

    public void setToDate(Date toDate) {
        this.toDate = (Date) toDate.clone();
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }

    public void setHashTags(List<String> hashTags) {
        this.hashTags = new ArrayList<>(hashTags);
    }

    public boolean checkAd(Ad ad){
        if((fromDate == null || fromDate.getTime() <= ad.getCreatedAt().getTime())
                && (toDate == null || toDate.getTime() >= ad.getCreatedAt().getTime())
                && (vendor == null || ad.getVendor().equals(vendor))){
            if(hashTags == null){
                return true;
            } else {
                return ad.getHashTags().containsAll(hashTags);
            }
        } else {
            return false;
        }
    }

}