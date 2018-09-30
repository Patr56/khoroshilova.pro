package pro.khoroshilova.site.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SiteController {

    private final String DEFAULT_LAYOUT = "layout";
    private final String PROP_ACTIVE_PAGE = "activePage";

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute(PROP_ACTIVE_PAGE, "index");
        return DEFAULT_LAYOUT;
    }

    @GetMapping("/blog")
    public String blog(Model model) {
        model.addAttribute(PROP_ACTIVE_PAGE, "blog");
        return DEFAULT_LAYOUT;
    }

    @GetMapping("/contacts")
    public String contacts(Model model) {
        model.addAttribute(PROP_ACTIVE_PAGE, "contacts");
        return DEFAULT_LAYOUT;
    }

    @GetMapping("/portfolio")
    public String portfolio(Model model) {
        model.addAttribute(PROP_ACTIVE_PAGE, "portfolio");
        return DEFAULT_LAYOUT;
    }

    @GetMapping("/price")
    public String price(Model model) {
        model.addAttribute(PROP_ACTIVE_PAGE, "price");
        return DEFAULT_LAYOUT;
    }
}
