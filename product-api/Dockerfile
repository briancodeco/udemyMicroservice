
FROM maven:3.8.5-openjdk-17

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do projeto para o diretório de trabalho
COPY pom.xml .
COPY src ./src

# Execute o comando Maven para construir o projeto, ignorando os testes
RUN mvn clean install -DskipTests

# Exponha a porta que a aplicação usará
EXPOSE 8081

# Defina o comando padrão para executar a aplicação
CMD ["mvn", "spring-boot:run"]