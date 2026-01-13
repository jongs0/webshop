package eindproject.webshop.config;

import eindproject.webshop.model.Role;
import eindproject.webshop.model.appuser.AppUser;
import eindproject.webshop.model.enums.ipad.*;
import eindproject.webshop.model.enums.iphone.*;
import eindproject.webshop.model.enums.iwatch.*;
import eindproject.webshop.model.enums.macbook.*;
import eindproject.webshop.model.enums.product.Category;
import eindproject.webshop.model.enums.product.State;
import eindproject.webshop.model.product.*;
import eindproject.webshop.repository.AppUserRepository;
import eindproject.webshop.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsers(
            AppUserRepository userRepository,
            PasswordEncoder passwordEncoder,
            ProductRepository productRepository
    ) {
        return args -> {

            if (!userRepository.existsByEmail("admin@webshop.com")) {
                AppUser admin = new AppUser();
                admin.setEmail("admin@webshop.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(Role.ADMIN);
                admin.setFirstName("Admin");
                admin.setLastName("User");

                userRepository.save(admin);
            }

            if (!userRepository.existsByEmail("user@webshop.com")) {
                AppUser user = new AppUser();
                user.setEmail("user@webshop.com");
                user.setPassword(passwordEncoder.encode("user123"));
                user.setRole(Role.USER);
                user.setFirstName("Normal");
                user.setLastName("User");

                userRepository.save(user);
            }

            // Initialize products if none exist
            if (productRepository.count() == 0) {
                initProducts(productRepository);
            }
        };
    }

    private void initProducts(ProductRepository productRepository) {
        // iPhone Products
        Iphone iphone1 = new Iphone();
        iphone1.setName("iPhone 15 Pro");
        iphone1.setDescription("Latest iPhone with advanced camera system and A17 Pro chip");
        iphone1.setModel("iPhone 15 Pro");
        iphone1.setPrice(1099.99);
        iphone1.setStock(25);
        iphone1.setProductEnabled(true);
        iphone1.setState(State.AS_NEW);
        iphone1.setCategory(Category.IPHONE);
        iphone1.setColor(IphoneColor.BLACK);
        iphone1.setGeneration(IphoneGeneration.GEN_15);
        iphone1.setStorage(IphoneStorage.GB_256);
        iphone1.setNetworkType(IphoneNetworkType.NETWORK_TYPE_5G);
        iphone1.setSimType(IphoneSimType.ESIM);
        productRepository.save(iphone1);

        Iphone iphone2 = new Iphone();
        iphone2.setName("iPhone 14");
        iphone2.setDescription("Reliable iPhone with excellent performance and battery life");
        iphone2.setModel("iPhone 14");
        iphone2.setPrice(799.99);
        iphone2.setStock(30);
        iphone2.setProductEnabled(true);
        iphone2.setState(State.AS_NEW);
        iphone2.setCategory(Category.IPHONE);
        iphone2.setColor(IphoneColor.BLUE);
        iphone2.setGeneration(IphoneGeneration.GEN_14);
        iphone2.setStorage(IphoneStorage.GB_128);
        iphone2.setNetworkType(IphoneNetworkType.NETWORK_TYPE_5G);
        iphone2.setSimType(IphoneSimType.SIM);
        productRepository.save(iphone2);

        Iphone iphone3 = new Iphone();
        iphone3.setName("iPhone 16");
        iphone3.setDescription("Brand new iPhone with cutting-edge technology");
        iphone3.setModel("iPhone 16");
        iphone3.setPrice(1199.99);
        iphone3.setStock(15);
        iphone3.setProductEnabled(true);
        iphone3.setState(State.AS_NEW);
        iphone3.setCategory(Category.IPHONE);
        iphone3.setColor(IphoneColor.TEAL);
        iphone3.setGeneration(IphoneGeneration.GEN_16);
        iphone3.setStorage(IphoneStorage.GB_512);
        iphone3.setNetworkType(IphoneNetworkType.NETWORK_TYPE_5G);
        iphone3.setSimType(IphoneSimType.ESIM);
        productRepository.save(iphone3);

        Iphone iphone4 = new Iphone();
        iphone4.setName("iPhone 13");
        iphone4.setDescription("Great value iPhone with powerful features");
        iphone4.setModel("iPhone 13");
        iphone4.setPrice(699.99);
        iphone4.setStock(35);
        iphone4.setProductEnabled(true);
        iphone4.setState(State.GOOD);
        iphone4.setCategory(Category.IPHONE);
        iphone4.setColor(IphoneColor.PINK);
        iphone4.setGeneration(IphoneGeneration.GEN_13);
        iphone4.setStorage(IphoneStorage.GB_256);
        iphone4.setNetworkType(IphoneNetworkType.NETWORK_TYPE_5G);
        iphone4.setSimType(IphoneSimType.SIM);
        productRepository.save(iphone4);

        // iPad Products
        Ipad ipad1 = new Ipad();
        ipad1.setName("iPad Pro 12.9\"");
        ipad1.setDescription("Professional iPad with M2 chip and Liquid Retina XDR display");
        ipad1.setModel("iPad Pro 12.9\"");
        ipad1.setPrice(1099.99);
        ipad1.setStock(20);
        ipad1.setProductEnabled(true);
        ipad1.setState(State.AS_NEW);
        ipad1.setCategory(Category.IPAD);
        ipad1.setColor(IpadColor.SPACE_GREY);
        ipad1.setGeneration(IpadGeneration.GEN_10);
        ipad1.setStorage(IpadStorage.GB_256);
        ipad1.setConnectivity(IpadConnectivity.WIFI_BLUETOOTH_MOBILEDATA);
        productRepository.save(ipad1);

        Ipad ipad2 = new Ipad();
        ipad2.setName("iPad Air");
        ipad2.setDescription("Versatile iPad with M2 chip and all-screen design");
        ipad2.setModel("iPad Air");
        ipad2.setPrice(599.99);
        ipad2.setStock(28);
        ipad2.setProductEnabled(true);
        ipad2.setState(State.AS_NEW);
        ipad2.setCategory(Category.IPAD);
        ipad2.setColor(IpadColor.BLUE);
        ipad2.setGeneration(IpadGeneration.GEN_9);
        ipad2.setStorage(IpadStorage.GB_128);
        ipad2.setConnectivity(IpadConnectivity.WIFI_BLUETOOTH);
        productRepository.save(ipad2);

        Ipad ipad3 = new Ipad();
        ipad3.setName("iPad");
        ipad3.setDescription("Affordable iPad perfect for everyday use");
        ipad3.setModel("iPad");
        ipad3.setPrice(449.99);
        ipad3.setStock(40);
        ipad3.setProductEnabled(true);
        ipad3.setState(State.AS_NEW);
        ipad3.setCategory(Category.IPAD);
        ipad3.setColor(IpadColor.WHITE);
        ipad3.setGeneration(IpadGeneration.GEN_8);
        ipad3.setStorage(IpadStorage.GB_64);
        ipad3.setConnectivity(IpadConnectivity.WIFI_BLUETOOTH);
        productRepository.save(ipad3);

        Ipad ipad4 = new Ipad();
        ipad4.setName("iPad Mini");
        ipad4.setDescription("Compact iPad with powerful performance");
        ipad4.setModel("iPad Mini");
        ipad4.setPrice(499.99);
        ipad4.setStock(22);
        ipad4.setProductEnabled(true);
        ipad4.setState(State.GOOD);
        ipad4.setCategory(Category.IPAD);
        ipad4.setColor(IpadColor.PURPLE);
        ipad4.setGeneration(IpadGeneration.GEN_7);
        ipad4.setStorage(IpadStorage.GB_128);
        ipad4.setConnectivity(IpadConnectivity.WIFI_BLUETOOTH_MOBILEDATA);
        productRepository.save(ipad4);

        // MacBook Products (unique chip types: M1, M2, M3, M4)
        Macbook macbook1 = new Macbook();
        macbook1.setName("MacBook Pro 16\"");
        macbook1.setDescription("Powerful MacBook Pro with M1 Pro chip for professionals");
        macbook1.setModel("MacBook Pro 16\"");
        macbook1.setPrice(2499.99);
        macbook1.setStock(12);
        macbook1.setProductEnabled(true);
        macbook1.setState(State.AS_NEW);
        macbook1.setCategory(Category.MACBOOK);
        macbook1.setReleaseYear(2021);
        macbook1.setChipType(MacbookChipType.M1);
        macbook1.setRamSize(MacbookRamSize.GB_16);
        macbook1.setStorage(MacbookStorage.GB_512);
        macbook1.setColor(MacbookColor.SPACE_GREY);
        productRepository.save(macbook1);

        Macbook macbook2 = new Macbook();
        macbook2.setName("MacBook Air 13\"");
        macbook2.setDescription("Lightweight and powerful MacBook Air with M2 chip");
        macbook2.setModel("MacBook Air 13\"");
        macbook2.setPrice(1199.99);
        macbook2.setStock(25);
        macbook2.setProductEnabled(true);
        macbook2.setState(State.AS_NEW);
        macbook2.setCategory(Category.MACBOOK);
        macbook2.setReleaseYear(2022);
        macbook2.setChipType(MacbookChipType.M2);
        macbook2.setRamSize(MacbookRamSize.GB_8);
        macbook2.setStorage(MacbookStorage.GB_256);
        macbook2.setColor(MacbookColor.SILVER);
        productRepository.save(macbook2);

        Macbook macbook3 = new Macbook();
        macbook3.setName("MacBook Pro 14\"");
        macbook3.setDescription("Compact MacBook Pro with M3 chip and excellent display");
        macbook3.setModel("MacBook Pro 14\"");
        macbook3.setPrice(1999.99);
        macbook3.setStock(18);
        macbook3.setProductEnabled(true);
        macbook3.setState(State.AS_NEW);
        macbook3.setCategory(Category.MACBOOK);
        macbook3.setReleaseYear(2023);
        macbook3.setChipType(MacbookChipType.M3);
        macbook3.setRamSize(MacbookRamSize.GB_16);
        macbook3.setStorage(MacbookStorage.GB_1024);
        macbook3.setColor(MacbookColor.SPACE_GREY);
        productRepository.save(macbook3);

        Macbook macbook4 = new Macbook();
        macbook4.setName("MacBook Pro 16\"");
        macbook4.setDescription("Latest MacBook Pro with M4 chip for ultimate performance");
        macbook4.setModel("MacBook Pro 16\"");
        macbook4.setPrice(2799.99);
        macbook4.setStock(15);
        macbook4.setProductEnabled(true);
        macbook4.setState(State.AS_NEW);
        macbook4.setCategory(Category.MACBOOK);
        macbook4.setReleaseYear(2024);
        macbook4.setChipType(MacbookChipType.M4);
        macbook4.setRamSize(MacbookRamSize.GB_24);
        macbook4.setStorage(MacbookStorage.GB_512);
        macbook4.setColor(MacbookColor.SPACE_GREY);
        productRepository.save(macbook4);

        // iWatch Products (unique release years: 2020, 2021, 2022, 2023)
        Iwatch iwatch1 = new Iwatch();
        iwatch1.setName("Apple Watch Series 6");
        iwatch1.setDescription("Apple Watch with advanced health features and always-on display");
        iwatch1.setModel("Apple Watch Series 6");
        iwatch1.setPrice(399.99);
        iwatch1.setStock(30);
        iwatch1.setProductEnabled(true);
        iwatch1.setState(State.GOOD);
        iwatch1.setCategory(Category.IWATCH);
        iwatch1.setReleaseYear(2020);
        iwatch1.setCaseColor(IwatchCaseColor.BLACK);
        iwatch1.setBandColor(IwatchBandColor.BLACK);
        iwatch1.setConnectivity(IwatchConnectivity.WIFI_BLUETOOTH_MOBILEDATA);
        iwatch1.setBandType(IwatchBandType.ALPINE_TITANIUM);
        productRepository.save(iwatch1);

        Iwatch iwatch2 = new Iwatch();
        iwatch2.setName("Apple Watch Series 7");
        iwatch2.setDescription("Larger display Apple Watch with faster charging");
        iwatch2.setModel("Apple Watch Series 7");
        iwatch2.setPrice(399.99);
        iwatch2.setStock(25);
        iwatch2.setProductEnabled(true);
        iwatch2.setState(State.AS_NEW);
        iwatch2.setCategory(Category.IWATCH);
        iwatch2.setReleaseYear(2021);
        iwatch2.setCaseColor(IwatchCaseColor.BLUE);
        iwatch2.setBandColor(IwatchBandColor.BLACK);
        iwatch2.setConnectivity(IwatchConnectivity.WIFI_BLUETOOTH_MOBILEDATA);
        iwatch2.setBandType(IwatchBandType.OCEAN_RUBBER);
        productRepository.save(iwatch2);

        Iwatch iwatch3 = new Iwatch();
        iwatch3.setName("Apple Watch Series 8");
        iwatch3.setDescription("Apple Watch with temperature sensor and crash detection");
        iwatch3.setModel("Apple Watch Series 8");
        iwatch3.setPrice(399.99);
        iwatch3.setStock(35);
        iwatch3.setProductEnabled(true);
        iwatch3.setState(State.AS_NEW);
        iwatch3.setCategory(Category.IWATCH);
        iwatch3.setReleaseYear(2022);
        iwatch3.setCaseColor(IwatchCaseColor.DARK_GREEN);
        iwatch3.setBandColor(IwatchBandColor.BEIGE);
        iwatch3.setConnectivity(IwatchConnectivity.WIFI_BLUETOOTH_MOBILEDATA);
        iwatch3.setBandType(IwatchBandType.TRAIL_POLYESTER);
        productRepository.save(iwatch3);

        Iwatch iwatch4 = new Iwatch();
        iwatch4.setName("Apple Watch Series 9");
        iwatch4.setDescription("Latest Apple Watch with advanced health features and S9 chip");
        iwatch4.setModel("Apple Watch Series 9");
        iwatch4.setPrice(399.99);
        iwatch4.setStock(28);
        iwatch4.setProductEnabled(true);
        iwatch4.setState(State.AS_NEW);
        iwatch4.setCategory(Category.IWATCH);
        iwatch4.setReleaseYear(2023);
        iwatch4.setCaseColor(IwatchCaseColor.BLACK);
        iwatch4.setBandColor(IwatchBandColor.BLACK);
        iwatch4.setConnectivity(IwatchConnectivity.WIFI_BLUETOOTH_MOBILEDATA);
        iwatch4.setBandType(IwatchBandType.ALPINE_TITANIUM);
        productRepository.save(iwatch4);
    }
}
