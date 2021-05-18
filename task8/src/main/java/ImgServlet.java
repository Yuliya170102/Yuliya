import org.json.JSONWriter;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.*;
import java.util.Collection;

@MultipartConfig
@WebServlet(name = "ImgServlet", value = "/ImgServlet")
public class ImgServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("image/jpeg");
        String filename = request.getParameter("filename");
        //new BufferedOutputStream(response.getOutputStream()).write(new BufferedInputStream(new FileInputStream(filename)).readAllBytes());
        response.getOutputStream().write(new FileInputStream(filename).readAllBytes());
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        Collection<Part> parts = request.getParts();
        for (Part part : parts){
            String contentType = part.getContentType();
            System.out.println("contentType = " + contentType);
            System.out.println("file = " + part.getSubmittedFileName());
            File file = new File(part.getSubmittedFileName());
            if(!file.exists()){
                file.createNewFile();
            }
            try(FileOutputStream fos = new FileOutputStream(file)) {
                fos.write(part.getInputStream().readAllBytes());
                new JSONWriter(response.getWriter()).object().key("filename")
                        .value(file.getPath())
                        .endObject();
            }
        }
    }
}