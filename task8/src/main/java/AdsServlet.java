import adList.Ad;
import adList.AdList;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@WebServlet(name = "AdsServlet", value = "/ads")
public class AdsServlet extends HttpServlet {
    AdList adList;
    @Override
    public void init() throws ServletException {
        adList = new AdList();
        List<String> tags1 = new ArrayList<>();
        tags1.add("tags");
        Ad ad = new Ad("1","description", new Date(),"link", "vendor",tags1,"discount", new Date());
        adList.add(ad);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getParameter("id");
        if(id != null){
            response.getWriter().println("<html>" + (adList != null ? adList.get(id).toString() : "null") + "</html>");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getParameter("id");
        if(id != null){
            response.setContentType("application/json");
            response.getWriter().print(
                    new Gson().toJson(adList.get(id)));
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getParameter("id");
        if(id != null){
            adList.remove(id);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String json = req.getParameter("ad");
        Ad ad = new Ad("{"+json+"}");
        resp.getWriter().println(adList.add(ad));
    }
}