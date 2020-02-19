package svoboda_vlad.seznam.cz.jhipsterdemo;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("svoboda_vlad.seznam.cz.jhipsterdemo");

        noClasses()
            .that()
                .resideInAnyPackage("svoboda_vlad.seznam.cz.jhipsterdemo.service..")
            .or()
                .resideInAnyPackage("svoboda_vlad.seznam.cz.jhipsterdemo.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..svoboda_vlad.seznam.cz.jhipsterdemo.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
