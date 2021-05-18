package adList;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class AdList {
    private List<Ad> adList;

    public AdList() {
        adList = new ArrayList<>();
    }

    public AdList(List<Ad> adList) {
        this.adList = new ArrayList<>();
        adList.forEach(ad -> this.adList.add(ad.clone()));
    }

    public List<Ad> getPage(int skip, int top) {
        return getPage(skip, top, null);
    }

    public List<Ad> getPage(int skip, int top, FilterConfig filterConfig) {

        List<Ad> result = new ArrayList<>();
        if (filterConfig == null) {
            result = adList.subList(skip, Math.min(top + skip, adList.size()));
        } else {
            for (Ad ad : adList) {
                if (filterConfig.checkAd(ad)) {
                    result.add(ad);
                }
            }
            result = result.subList(skip, Math.min(top + skip, adList.size()));
        }
        return result;
    }

    public Ad get(String id) {
        if (adList == null) {
            return null;
        }
        List<Ad> ads = adList.stream().filter(ad -> ad.getId().equals(id)).collect(Collectors.toList());
        return ads.size() != 0 ? ads.get(0) : null;
    }

    public boolean add(Ad adItem) {
        if (AdList.validate(adItem) && get(adItem.getId()) == null) {
            return adList.add(adItem.clone());
        } else {
            return false;
        }
    }

    public boolean edit(String id, AdIncomplete adItem) {
        Ad ad = this.get(id);
        if (ad == null) {
            return false;
        } else {
            Ad adClone = ad.clone();
            AdIncomplete.merge(adClone, adItem);
            if (AdList.validate(adClone)) {
                AdIncomplete.merge(ad, adItem);
                return true;
            } else {
                return false;
            }
        }
    }

    public boolean remove(String id) {
        return adList.removeIf(ad -> ad.getId().equals(id));
    }

    public void clear() {
        adList.clear();
    }

    public static boolean validate(Ad ad) {
        return (ad.getId() != null && !ad.getId().trim().equals("")
                && ad.getDescription() != null && !ad.getDescription().trim().equals("")
                && ad.getDescription().length() < 200
                && ad.getCreatedAt() != null
                && ad.getLink() != null && !ad.getDescription().trim().equals("")
                && ad.getVendor() != null && !ad.getVendor().trim().equals("")
                && ad.getHashTags() != null && ad.getHashTags().size() != 0
                && ad.getDiscount() != null && !ad.getDiscount().trim().equals("")
                && ad.getValidUntil() != null);
    }
}