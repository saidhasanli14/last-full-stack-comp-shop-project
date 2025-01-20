package az.developia.comp_shop_said_hasanli.entity;

import jakarta.persistence.Entity;

@Entity
public class ComputerAddEntity {
    private String category;
    private String name;
    private int price;
    private String condition;
    private String image;
    private String ram;
    private String processor;
    private String storage;
    private String storageType;
    private String os;
    private String gpu;

    public String getCategory(){
        return category;
    }

    public void setCategory(String category){
        this.category = category;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public int getPrice(){
        return price;
    }

    public void setPrice(int price){
        this.price = price;
    }

    public String getCondition(){
        return condition;
    }

    public void setCondition(String condition){
        this.condition = condition;
    }

    public String getImage(){
        return image;
    }

    public void setImage(String image){
        this.image = image;
    }


    public String getRam(){
        return ram;
    }

    public void setRam(String ram){
        this.ram = ram;
    }

    public String getProcessor(){
        return processor;
    }

    public void setProcessor(String processor){
        this.processor = processor;
    }

    public String getStorage(){
        return storage;
    }

    public void setStorage(String storage){
        this.storage = storage;
    }

    public String getStorageType(){
        return storageType;
    }

    public void setStorageType(String storageType){
        this.storageType = storageType;
    }

    public String getOs(){
        return os;
    }

    public void setOs(String os){
        this.os = os;
    }

    public String getGpu(){
        return gpu;
    }

    public void setGpu(String gpu){
        this.gpu = gpu;
    }
}
