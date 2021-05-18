import adList.Ad;
import adList.AdList;
import adList.FilterConfig;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@WebServlet(name = "PageServlet", value = "/ads/search")
public class PageServlet extends HttpServlet {
    AdList adList;
    @Override
    public void init() throws ServletException {
        adList = new AdList();
        List<String> tags1 = new ArrayList<>();
        tags1.add("tags");
        Ad ad = new Ad("1","description", new Date(),"link", "",tags1,"discount", new Date());
        adList.add(ad);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        FilterConfig filterConfig = new FilterConfig(request.getParameter("filterConfig"));
        int skip = Integer.parseInt(request.getParameter("skip"));
        int top = Integer.parseInt(request.getParameter("top"));
        String gsonStr = new Gson().toJson(adList.getPage(skip, top, filterConfig));

        response.setContentType("application/json");
        response.getWriter().print(gsonStr);
    }
}