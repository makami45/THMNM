# --- Giai đoạn 1: Build ứng dụng (Dùng Maven) ---
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy file cấu hình và tải thư viện về trước (để tận dụng cache)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy toàn bộ code nguồn và build
COPY src ./src
RUN mvn clean package -DskipTests

# --- Giai đoạn 2: Chạy ứng dụng (Dùng Java JRE nhẹ) ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Lấy file .jar đã build từ giai đoạn 1 sang giai đoạn 2
COPY --from=build /app/target/*.jar app.jar

# Mở cổng 8080
EXPOSE 8080

# Lệnh chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]