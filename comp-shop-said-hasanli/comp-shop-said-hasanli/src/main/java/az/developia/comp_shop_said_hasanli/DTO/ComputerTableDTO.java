package az.developia.comp_shop_said_hasanli.DTO;

public class ComputerTableDTO {
    private Long id;
    private String name;
    private String image;
    private int price;
    private String operations;


    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getImage(){
        return image;
    }

    public void setImage(String image){
        this.image = image;
    }

    public int getPrice(){
        return price;
    }

    public void setPrice(int price){
        this.price = price;
    }

    public String getOperations(){
        return operations;
    }

    public void setOperations(String operations){
        this.operations = operations;
    }
}
