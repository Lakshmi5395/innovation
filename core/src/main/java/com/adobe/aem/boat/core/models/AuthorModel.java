package com.adobe.aem.boat.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
@Model(adaptables = SlingHttpServletRequest.class,defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AuthorModel {

    @ValueMapValue
    private String first;

    @ValueMapValue
    private String second;
    @ValueMapValue
    private String third;



    @ValueMapValue
    private String next;

    @ValueMapValue
    private String email;
    public String getFirst(){
        return first;
    }

    public String getSecond(){
        return second;
    }

    public String getThird() {
        return third;
    }
    public String getNext() {
        return next;
    }

    public String getEmail() {
        return email;
    }
}
