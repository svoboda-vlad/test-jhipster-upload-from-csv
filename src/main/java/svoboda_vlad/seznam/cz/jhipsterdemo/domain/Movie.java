package svoboda_vlad.seznam.cz.jhipsterdemo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Movie.
 */
@Entity
@Table(name = "movie")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Movie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Min(value = 1900)
    @Max(value = 2100)
    @Column(name = "year")
    private Integer year;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "movie_actor",
               joinColumns = @JoinColumn(name = "movie_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "actor_id", referencedColumnName = "id"))
    private Set<Actor> actors = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("movies")
    private Director director;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Movie name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getYear() {
        return year;
    }

    public Movie year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Set<Actor> getActors() {
        return actors;
    }

    public Movie actors(Set<Actor> actors) {
        this.actors = actors;
        return this;
    }

    public Movie addActor(Actor actor) {
        this.actors.add(actor);
        actor.getMovies().add(this);
        return this;
    }

    public Movie removeActor(Actor actor) {
        this.actors.remove(actor);
        actor.getMovies().remove(this);
        return this;
    }

    public void setActors(Set<Actor> actors) {
        this.actors = actors;
    }

    public Director getDirector() {
        return director;
    }

    public Movie director(Director director) {
        this.director = director;
        return this;
    }

    public void setDirector(Director director) {
        this.director = director;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Movie)) {
            return false;
        }
        return id != null && id.equals(((Movie) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Movie{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", year=" + getYear() +
            "}";
    }
}
