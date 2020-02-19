package svoboda_vlad.seznam.cz.jhipsterdemo.repository;

import svoboda_vlad.seznam.cz.jhipsterdemo.domain.Director;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Director entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DirectorRepository extends JpaRepository<Director, Long> {

}
