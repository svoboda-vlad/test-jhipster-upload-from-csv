package svoboda_vlad.seznam.cz.jhipsterdemo.repository;

import svoboda_vlad.seznam.cz.jhipsterdemo.domain.Actor;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Actor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ActorRepository extends JpaRepository<Actor, Long> {

}
